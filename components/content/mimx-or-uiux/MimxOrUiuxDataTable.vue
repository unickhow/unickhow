<script setup lang="ts">
const columns = ref([
  {
    title: 'Order number',
    dataIndex: 'order_number',
    key: 'order_number',
    filter: true
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    width: 200
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    filter: true
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filter: true
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    filter: true
  }
])

const orders = ref([
  {
    order_number: 'ORDER_26769870275591',
    customer: 'John Doe',
    phone: '+12345678900',
    email: 'john@mail.com',
    country: 'United States',
    address: 'New York, 10th Avenue, 45',
    status: 'Pending',
    amount: '$ 1,250.00',
    created_at: '2021-08-12 12:00:00',
    action: 'View'
  },
  {
    order_number: 'ORDER_12345678901234',
    customer: 'Jane Smith',
    phone: '+19876543210',
    email: 'jane@example.com',
    country: 'Canada',
    address: 'Toronto, Main Street, 123',
    status: 'Shipped',
    amount: '$ 850.50',
    created_at: '2022-03-25 14:30:00',
    action: 'View'
  },
  {
    order_number: 'ORDER_87654321098765',
    customer: 'Alice Johnson',
    phone: '+442012345678',
    email: 'alice@gmail.com',
    country: 'United Kingdom',
    address: 'London, Oxford Street, 789',
    status: 'Delivered',
    amount: '£ 500.75',
    created_at: '2022-05-18 09:15:00',
    action: 'View'
  },
  {
    order_number: 'ORDER_55555555555555',
    customer: 'Bob Brown',
    phone: '+15555555555',
    email: 'bob@example.com',
    country: 'United States',
    address: 'Los Angeles, Sunset Blvd, 321',
    status: 'Processing',
    amount: '$ 600.00',
    created_at: '2022-07-10 17:45:00',
    action: 'View'
  },
  {
    order_number: 'ORDER_98765432101234',
    customer: 'Emily Davis',
    phone: '+11234567890',
    email: 'emily@mail.com',
    country: 'United States',
    address: 'Chicago, Elm Street, 567',
    status: 'Pending',
    amount: '$ 1,000.25',
    created_at: '2022-09-02 08:20:00',
    action: 'View'
  }
])

const isPainful = ref(false)
</script>

<template>
  <div class="data-table w-[90%] my-12 mx-auto">
    <div class="flex justify-center mb-6 bg-[#f7f7f7] p-1 rounded">
      <button
        class="hover:bg-[#f7f7f722] text-md text-[#888] flex-1"
        :class="{ 'font-bold !bg-primary !opacity-100 !text-white': !isPainful }"
        @click="isPainful = false">Generally</button>
      <button
        class="hover:bg-[#f7f7f722] text-md text-[#888] flex-1"
        :class="{ 'font-bold !bg-primary !opacity-100 !text-white': isPainful }"
        @click="isPainful = true">Extraordinary</button>
    </div>
    <div v-show="!isPainful" class="border-solid border-1 rounded p-4">
      <div class="flex flex-wrap gap-2">
        <div class="field flex-1 flex flex-col sm:flex-row sm:gap-2">
          <label for="">Order number</label>
          <input type="text" class="rounded p-2">
        </div>
        <div class="field flex-1 flex flex-col sm:flex-row sm:gap-2">
          <label for="">Country</label>
          <input type="text" class="rounded p-2">
        </div>
        <div class="field flex-1 flex flex-col sm:flex-row sm:gap-2">
          <label for="">Status</label>
          <input type="text" class="rounded p-2">
        </div>
        <div class="field flex-1 flex flex-col sm:flex-row sm:gap-2">
          <label for="">Created at</label>
          <input type="text" class="rounded p-2">
        </div>
      </div>
      <div class="flex gap-2 mt-6">
        <button class="bg-primary !text-white">Query</button>
        <button>Reset</button>
      </div>
    </div>
    <div class="w-full overflow-x-auto">
      <table>
        <thead class="bg-gray-100">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :width="column.width"
              class="py-4 px-6 border-b border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <div class="inline-flex gap-4 items-center">
                <span>{{ column.title }}</span>
                <Icon
                  v-if="column.filter && isPainful"
                  :name="column.key === 'created_at' ? 'material-symbols:filter-alt-sharp' : 'material-symbols:filter-alt-outline-sharp'"
                  class="ml-auto" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="order in orders" :key="order.order_number" class="hover:bg-gray-100">
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.order_number }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.customer }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.phone }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.email }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.country }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.address }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.status }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.amount }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300 text-sm">
              {{ order.created_at }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.data-table button {
  @apply py-2 px-4 rounded;
}
</style>
