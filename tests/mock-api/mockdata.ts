import dbjson from '../../fakeJsonApi/db.json';
export const issueList = [
  ...dbjson.ticket,
  ...dbjson.ticket,
  ...dbjson.ticket,
  ...dbjson.ticket,
];
export const issueListLess = dbjson.ticket;
export const issueListNext = dbjson.ticket;
export const priorityList = dbjson.priority;
export const categoryList = dbjson.category;
export const statusList = dbjson.status;
export const applicationList = dbjson.application;
