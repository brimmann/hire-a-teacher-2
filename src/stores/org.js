import { defineStore } from 'pinia';

export const useOrgStore = defineStore('org', {
  state: () => ({
    determiners: {
      dashboardState: 'jobs-list',
    },
    jobs: [
      {
        title: 'Math Teacher',
        apps_no: '8',
        exp_level: 'Entry Level',
        type: 'Full-time',
        date_posted: '1658315023229',
        city: 'Islamabad',
        expire_date: '2022-07-28',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium autem cum cupiditate deserunt est eum, fugit inventore iure minima minus mollitia nam non nulla omnis perspiciatis provident quae quidem quis reprehenderit sunt ut veniam voluptates? Porro, sunt, voluptates? Ad atque aut autem consequuntur, corporis deserunt distinctio doloremque dolores ducimus ea eos et ex fugit in itaque labore libero magni minima minus modi molestiae mollitia neque non nulla officiis pariatur quae quam, quia quibusdam quidem quo recusandae repellendus repudiandae sint sit vel vero! Ab adipisci at cupiditate delectus doloribus hic in minima, minus modi quasi qui sunt totam voluptate voluptatem.',
        tags: ['MATH', 'SCHOOL', 'TEACHER', 'PART'],
      },
    ],
  }),
});
