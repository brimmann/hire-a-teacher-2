<template>
  <q-card flat bordered class="q-mt-xs q-mb-sm max-width q-pb-lg" style="width: 100%">
    <div v-for="(skill, index) in resumeStore.skills" :key="index">
      <q-card-section class="row q-pt-sm items-center q-pb-xs">
        <div class="text-subtitle1">
          {{ skill.skill }}
          <q-popup-edit
            square
            v-model="resumeStore.skills[index].skill"
            :validate="(val) => val.length > 5"
            v-slot="scope"
            v-if="!readOnly"
          >
            <q-input
              autofocus
              v-model="scope.value"
              :model-value="scope.value"
              hint="Your nickname"
              :rules="[(val) => scope.validate(val) || 'More than 5 chars required']"
            >
              <template #after>
                <q-btn flat dense color="negative" icon="cancel" @click.stop="scope.cancel" />

                <q-btn
                  flat
                  dense
                  color="positive"
                  icon="check_circle"
                  @click.stop="onUpdateSkill(scope, skill)"
                  :disable="
                    scope.validate(scope.value) === false || scope.initialValue === scope.value
                  "
                />
              </template>
            </q-input>
          </q-popup-edit>
        </div>
        <q-space />
        <q-btn v-if="!readOnly" @click="onDeleteSkill(index)" flat size="md" color="primary" icon="delete" />
      </q-card-section>
      <q-separator inset />
    </div>
  </q-card>
</template>

<script>
import { mapStores } from 'pinia/dist/pinia.esm-browser';
import { useResumeStore } from 'stores/resume';

export default {
  name: 'ResumeSkillsSection',
  props: {
    readOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapStores(useResumeStore),
  },
  methods: {
    onUpdateSkill(scope, payload) {
      scope.set();
      this.resumeStore.updateResumeSkill(payload);
    },
    async onDeleteSkill(index) {
      const id = this.resumeStore.skills[index].id;
      this.resumeStore.skills.splice(index, 1);
      await this.resumeStore.deleteResumeSkill(id);
    },
  },
};
</script>

<style scoped></style>
