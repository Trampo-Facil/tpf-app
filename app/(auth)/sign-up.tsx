import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/auth.store';
import { registerWorkerSchema, RegisterWorkerFormValues } from '@/utils/validators';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { SelectField } from '@/components/ui/SelectField';
import { ErrorMessage } from '@/components/shared/ErrorMessage';
import { useJobCategories, useJobOccupationsByCategory } from '@/hooks/useJobCategories';
import { useStates, useCitiesByState } from '@/hooks/useLocales';

export default function SignUpScreen() {
  const router = useRouter();
  const { registerWorker, isLoading, error, clearError } = useAuthStore();
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);

  const { data: categories } = useJobCategories();
  const firstCategoryId = categories?.[0]?.id ?? null;
  const { data: occupations, isLoading: loadingOccupations } =
    useJobOccupationsByCategory(firstCategoryId);
  const { data: states, isLoading: loadingStates } = useStates();
  const { data: cities, isLoading: loadingCities } = useCitiesByState(selectedStateId);

  const occupationOptions = occupations?.map((o) => ({ label: o.name, value: o.id })) ?? [];
  const stateOptions = states?.map((s) => ({ label: s.name, value: s.id })) ?? [];
  const cityOptions = cities?.map((c) => ({ label: c.name, value: c.id })) ?? [];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterWorkerFormValues>({
    resolver: zodResolver(registerWorkerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      jobOccupationIds: [],
      operationCitiesIds: [],
    },
  });

  const onSubmit = async (data: RegisterWorkerFormValues) => {
    clearError();
    const { confirmPassword: _, ...payload } = data;
    await registerWorker(payload);
    if (!useAuthStore.getState().error) router.replace('/(auth)/sign-in');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={() => router.back()} className="flex-row items-center gap-2 mb-8">
            <Ionicons name="arrow-back" size={22} color="#2563eb" />
            <Text className="text-primary-600 font-medium">Voltar</Text>
          </Pressable>

          <View className="gap-4">
            <View className="mb-2">
              <Text className="text-2xl font-bold text-slate-900">Criar conta</Text>
              <Text className="text-slate-500 mt-1">Cadastre-se como trabalhador</Text>
            </View>

            {error && <ErrorMessage message={error} />}

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Nome completo"
                  placeholder="Seu nome"
                  autoCapitalize="words"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="E-mail"
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Telefone"
                  placeholder="11999999999"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.phone?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Senha"
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirmar senha"
                  placeholder="Repita a senha"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.confirmPassword?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="jobOccupationIds"
              render={({ field: { value, onChange } }) => (
                <MultiSelect
                  label="Ocupações"
                  placeholder="Selecione suas ocupações"
                  options={occupationOptions}
                  value={value}
                  onChange={onChange}
                  loading={loadingOccupations}
                  error={errors.jobOccupationIds?.message}
                />
              )}
            />

            <SelectField
              label="Estado de atuação"
              placeholder="Selecione um estado"
              options={stateOptions}
              value={selectedStateId}
              onChange={(stateId) => {
                setSelectedStateId(stateId);
                setValue('operationCitiesIds', []);
              }}
              loading={loadingStates}
            />

            <Controller
              control={control}
              name="operationCitiesIds"
              render={({ field: { value, onChange } }) => (
                <MultiSelect
                  label="Cidades de atuação"
                  placeholder={
                    selectedStateId ? 'Selecione as cidades' : 'Selecione um estado primeiro'
                  }
                  options={cityOptions}
                  value={value}
                  onChange={onChange}
                  loading={loadingCities}
                  disabled={!selectedStateId}
                  error={errors.operationCitiesIds?.message as string | undefined}
                />
              )}
            />

            <Button
              label="Criar conta"
              onPress={handleSubmit(onSubmit)}
              loading={isLoading}
              fullWidth
              size="lg"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
