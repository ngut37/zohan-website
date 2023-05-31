// this is staff object
// {
//   "_id": "642dab2bbe7b0b7371ace7cf",
//   "name": "Jan Srna",
//   "email": "jan@example.com",
//   "company": "637159736dbf8d8cbd846267",
//   "role": "editor",
//   "password": {
//     "hash": "$2b$10$SszYKwMzvnf.PHbxJtFFC.h.3mD7g4dO4KxE6CUp7S6mUMmMWqzxO",
//     "salt": "$2b$10$SszYKwMzvnf.PHbxJtFFC."
//   },
//   "createdAt": "2023-04-05T17:08:59.249Z",
//   "updatedAt": "2023-05-16T22:26:41.126Z",
//   "__v": 0,
//   "venue": "645056027a58b8c9041e2526"
// },

export type Staff = {
  _id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  venue?: string;
};

export const exampleStaff: Staff = {
  _id: '642dab2bbe7b0b7371ace7cf',
  name: 'Jan Srna',
  email: 'jan.srna@example.com',
  company: '637159736dbf8d8cbd846267',
  role: 'editor',
  createdAt: '2023-04-05T17:08:59.249Z',
  updatedAt: '2023-05-16T22:26:41.126Z',
  venue: '645056027a58b8c9041e2526',
};
