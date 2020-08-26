export const validUser = {
  email: 'validemail@test.com',
  name: 'valid',
  surname: 'surname',
};

export const validProject = {
  name: 'Sample project',
  body: 'Sample project description',
  status: 'active',
  userId: 1,
};

export const invalidUserId = {
  name: 'Sample project',
  body: 'Sample project description',
  status: 'active',
  userId: 100,
  projectId: 1,
  description: 'Some description',
  score: 2,
};

export const invalidProjectId = {
  name: 'Sample project',
  body: 'Sample project description',
  status: 'active',
  userId: 1,
  score: 3,
  projectId: 100,
  description: 'Some description',
};

export const validTask = {
  name: 'Sample task',
  description: 'Lorem ipsum stuff',
  status: 'declined',
  score: 4,
  projectId: 1,
  userId: 1,
};
