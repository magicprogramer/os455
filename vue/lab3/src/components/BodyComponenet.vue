<template>
  <div class="container mt-3">
    <h3>Student List</h3>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.city }}</td>
          <td>
            <button class="btn btn-sm btn-outline-secondary me-1" @click="openModal('edit', student)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteStudent(student.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p class="mt-3 d-inline"><strong># of students {{ students.length }}</strong></p>
    <button class="btn btn-primary ms-3" @click="openModal('add')">Add Student</button>

    <div class="modal fade" id="addModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalMode === 'add' ? 'Add Student' : 'Edit Student' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input v-model="newStudent.name" type="text" class="form-control">
            </div>
            <div class="mb-3">
              <label class="form-label">City</label>
              <input v-model="newStudent.city" type="text" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button class="btn btn-success" @click="saveStudent">{{ modalMode === 'add' ? 'Add' : 'Update' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from 'bootstrap';

export default {
  data() {
    return {
      students: [
        { id: 100, name: 'Ahmed', city: 'Alex' },
        { id: 200, name: 'mahmed', city: 'Cairo' },
        { id: 300, name: 'ezzat', city: 'alex' },
        { id: 400, name: 'khalil', city: 'alex' },
        { id: 500, name: 'ibrahim', city: 'Aswan' }
      ],
      newStudent: { name: '', city: '' },
      editingId: null,
      modalMode: 'add',
      modalInstance: null
    };
  },
  methods: {
    openModal(mode, student = null) {
      this.modalMode = mode;
      if (mode === 'edit' && student) {
        this.newStudent = { name: student.name, city: student.city };
        this.editingId = student.id;
      } else {
        this.newStudent = { name: '', city: '' };
        this.editingId = null;
      }
      const modalEl = document.getElementById('addModal');
      this.modalInstance = new bootstrap.Modal(modalEl);
      this.modalInstance.show();
    },
    saveStudent() {
      if (!this.newStudent.name || !this.newStudent.city) return;
      if (this.modalMode === 'add') {
        this.students.push({
          id: Date.now(),
          name: this.newStudent.name,
          city: this.newStudent.city
        });
      } else {
        const index = this.students.findIndex(s => s.id === this.editingId);
        if (index !== -1) {
          this.students[index].name = this.newStudent.name;
          this.students[index].city = this.newStudent.city;
        }
      }
      this.newStudent = { name: '', city: '' };
      this.editingId = null;
      this.modalInstance.hide();
    },
    deleteStudent(id) {
      this.students = this.students.filter(student => student.id !== id);
    }
  }
};
</script>

<style scoped>
button svg {
  vertical-align: middle;
}
</style>
