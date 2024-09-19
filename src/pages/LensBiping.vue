<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Tabela de lentes"
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

              <q-form @submit="onSubmit($event)">
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

        <!-- Create button to clear all table data -->
        <q-btn
          flat
          round
          size="1.25em"
          :icon="'clear'"
          color="grey-9"
          @click="rows = []"
        >
          <q-tooltip class="bg-grey-9">Limpar tabela</q-tooltip>
        </q-btn>

        <q-space />

        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          emit-value
          map-options
          display-value="Colunas visíveis"
          :options="columns"
          option-value="name"
          :disable="rows.length === 0"
          style="min-width: 150px"
        />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { QTableProps } from 'quasar';
import { ref, watch } from 'vue';

import ExcelService from 'src/utils/excelService';

const rows = ref([] as { name: string }[]);
const tableData = ref();

const visibleColumns = ref([
  'Rua',
  'Prédio',
  'Andar',
  'Material',
  'Serie',
  'Descrição',
  'Data de Vencimento',
  'Colaborador',
]);

const columns = ref<QTableProps['columns']>(
  visibleColumns.value.map((column) => ({
    name: column,
    label: column,
    align: 'center',
    field: column,
    sortable: true,
  }))
);

export default {
  setup() {
    const selectedFile = ref<File | null>(null);

    watch(tableData, async (newData) => {
      if (newData && newData[Object.keys(newData)[0]]) {
        const columnsFromExcel = Object.keys(
          newData[Object.keys(newData)[0]][0]
        );

        columns.value!.splice(0, columns.value!.length);

        columnsFromExcel.forEach((column) => {
          if (visibleColumns.value!.includes(column)) {
            columns.value!.push({
              name: column,
              label: column,
              align: 'center',
              field: column,
              sortable: true,
            });
          }
        });
        visibleColumns.value = [...columnsFromExcel];

        rows.value = newData[Object.keys(newData)[0]];
      }
    });

    return {
      uploadFileDialog: ref(false),
      selectedFile,
      async onSubmit(evt: Event | SubmitEvent) {
        evt.preventDefault();

        if (selectedFile.value) {
          try {
            const jsonData = await ExcelService.readExcelFile(
              selectedFile.value,
              'Base de Dados'
            );

            tableData.value = jsonData;
          } catch (error) {
            console.log('Erro ao processar o arquivo Excel: ', error);
          }
        } else {
          console.log('Arquivo não selecionado');
        }
      },
      fillTable() {},
      columns,
      rows,

      pagination: ref({
        rowsPerPage: 0,
      }),
      visibleColumns,
    };
  },
};
</script>

<style lang="scss" scoped>
.lens-biping-table {
  height: 600px;
}
</style>
