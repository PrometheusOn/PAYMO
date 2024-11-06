import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Data, RequestBody } from '../types/request-show/request-body';
import { sha256 } from 'js-sha256';

export const useTransactionStore = defineStore('useTransactionStore', () => {
  const requestBody = ref<RequestBody>({
    hash_sum: '',
    transaction: '',
    amount: null,
    description: '',
    api_key: '',
    email: '',
    custom_data: {
      initiatorName: '',
      duesTitle: '',
    }
  });

  function assembleBody ({ transaction, amount, description, initiatorName, duesTitle}: Data) {
    requestBody.value =  {
      hash_sum: sha256(`${import.meta.env.VITE_API_KEY}${transaction}${(amount ?? 0) * 100}${import.meta.env.VITE_SECRET}`),
      transaction,
      amount,
      description,
      api_key: `${import.meta.env.VITE_API_KEY}`,
      email: 'ramazanfajzov@mail.ru',
      custom_data: {
        initiatorName,
        duesTitle
      }
    }
  }

  return { requestBody, assembleBody };
});
