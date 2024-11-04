<template>
  <ElForm
    ref="formRef"
    class="flex flex-col gap-8"
    :model="form"
    label-position="top"
    :rules="rules"
  >
    <ElFormItem label="Номер карты" v-mask="'#### #### #### ####'" max="19" prop="cardNumber">
      <ElInput v-model="form.cardNumber" clearable />
    </ElFormItem>
    <div class="flex gap-9 w-full">
      <ElFormItem label="Срок действия" v-mask="'##/##'" max="5" prop="expirationDate">
        <ElInput v-model="form.expirationDate" placeholder="ММ/ГГ" clearable />
      </ElFormItem>
      <ElFormItem label="CVV" v-mask="'###'" max="3" prop="cvv">
        <ElInput v-model="form.cvv" clearable/>
      </ElFormItem>
    </div>
    <ElFormItem label="Сумма перевода" prop="amount">
      <ElInput
        maxlength="15"
        v-model.lazy="form.amount"
        v-number-format="amountFormatOptions"
        :formatter="(value: string) => value"
        :parser="(value: string) => value.replace(amountFormatOptions.suffix, '')"
        clearable
      />
    </ElFormItem>
    <ElFormItem label="Ваше имя" prop="senderName">
      <ElInput v-model="form.senderName" clearable />
    </ElFormItem>
    <ElFormItem label="Сообщение получателю" prop="messageToRecipient">
      <ElInput v-model="form.messageToRecipient" clearable />
    </ElFormItem>
    <div class="flex justify-start items-center gap-4 pb-4">
      <ElButton type="primary" class="w-[131px]" @click="submitForm(formRef)">Перевести</ElButton>
      <ElButton type="primary" plain class="!ml-0 w-[129px]">Вернуться</ElButton>
    </div>
  </ElForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'
import { directive as vNumberFormat } from '@coders-tm/vue-number-format'
import router from '../router';
import { RequestBody } from '../types/request-show/request-body';
import { sha256 } from 'js-sha256';
import { PayForm } from '../types/pay-form/pay-form';

const {initiatorName, duesTitle} = defineProps<{
  initiatorName: string 
  duesTitle: string
}>()

const formRef = ref<FormInstance>()
const form = ref<PayForm>({
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  amount: null,
  senderName: '',
  messageToRecipient: '',
  transaction: '1',
})

const rules = ref<FormRules>({
  cardNumber: [{ required: true, validator: cardNumberValidator, trigger: 'change' }],
  expirationDate: [{ required: true, min: 5, message: 'Введите срок', trigger: 'change' }],
  cvv: [{ required: true, min: 3, message: 'Введите CVV', trigger: 'change' }],
  amount: [{ required: true, validator: amountValidator , trigger: 'change' }],
  senderName: [{ required: true, message: 'Введите имя', trigger: 'change' }],
})

const AMOUNT_CURRENCY = '₽'
const amountFormatOptions = {
  suffix: ` ${AMOUNT_CURRENCY}`,
  nullValue: AMOUNT_CURRENCY,
  separator: '',
}

function cardNumberValidator(rule: any, value: any, callback: any) {
  if (!value || value.length < 19) {
    return callback(new Error('Введите номер карты'))
  }

  const algorithmResult = algorithmLuhn(value)
  algorithmResult ? callback() : callback(new Error('Неправильно введён номер карты'))
}

function amountValidator(rule: any, value: any, callback: any) {
  if (!value || isNaN(value)) {
    callback(new Error('Введите сумму'))
  } else if (value < 10) {
    callback(new Error('Не менее 10 руб.'))
  } else {
    callback()
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  let isValid = true

  await formEl.validate((valid) => {
    if (!valid)
      isValid = false
  })
  if (!isValid)
    return

  const requestBody = <RequestBody>{
    hash_sum: sha256(`${import.meta.env.VITE_API_KEY}${form.value.transaction}${(form.value.amount ?? 0) * 100}${import.meta.env.VITE_SECRET}`),
    transaction: form.value.transaction,
    amount: form.value.amount,
    description: form.value.messageToRecipient,
    api_key: `${import.meta.env.VITE_API_KEY}`,
    email: 'ramazanfajzov@mail.ru',
    custom_data: {
      initiatorName,
      duesTitle
    },
  }

  router.push({ path: '/post', query: { requestBody: JSON.stringify(requestBody) }})
}

function algorithmLuhn (value: string) {
  const splittedCardNumber = (value.replace(/[\s]/g, '')).split('')
  let summ = 0

  splittedCardNumber.forEach((number, index) => {
    if (index % 2) {
      summ += +number
    } else {
      let step1 = +number * 2
      let step2 = step1 > 9 ? step1 - 9 : step1
      summ += step2
    }
  })

  return summ % 10 ? false : true
}
</script>

<style lang="scss" scoped>
.el-button {
  border-radius: 12px;
  height: 52px;
  border: none;
}

.el-form-item {
  margin-bottom: 0px;
  width: 100%;
}

.el-input {
  height: 52px;
}

:deep(.el-input__wrapper) {
  border-radius: 12px !important;
}

:deep(.el-form-item__label),
:deep(.el-form-item__error) {
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
}
</style>