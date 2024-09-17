<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      virtual-scroll
      v-model:pagination="pagination"
      :visible-columns="visibleColumns"
      :rows-per-page-options="[0]"
      class="lens-biping-table"
    >
      <template v-slot:top>
        <q-btn
          flat
          round
          size="1.25em"
          :icon="'file_upload'"
          color="grey-9"
          @click="uploadFileDialog = true"
        >
          <q-tooltip class="bg-grey-9">Carregar planilha</q-tooltip>
        </q-btn>

        <q-dialog v-model="uploadFileDialog">
          <q-card style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Carregar planilha</div>

              <q-form @submit="onSubmit">
                <q-file
                  v-model="selectedFile"
                  type="file"
                  label="Selecione um arquivo"
                  outlined
                  style="width: 100%"
                  class="q-mt-md"
                  clearable
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <q-btn
                  label="Submit"
                  type="submit"
                  color="primary"
                  class="q-mt-md"
                />
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-space />

        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { QTableProps } from 'quasar';
import { ref } from 'vue';

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    label: 'Dessert (100g serving)',
    required: true,
    align: 'left',
    field: (row: { name: unknown }) => row.name,
    format: (val: unknown) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories',
    align: 'center',
    label: 'Calories',
    field: 'calories',
    sortable: true,
  },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
];

export default {
  setup() {
    const selectedFile = ref(null);

    return {
      uploadFileDialog: ref(false),
      selectedFile,
      onSubmit() {
        console.log(selectedFile.value);
      },
      visibleColumns: ref([
        'calories',
        'desc',
        'fat',
        'carbs',
        'protein',
        'sodium',
        'calcium',
        'iron',
      ]),
      columns,
      rows,

      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
};
</script>

<style lang="scss" scoped>
.lens-biping-table {
  height: 600px;
}
</style>
