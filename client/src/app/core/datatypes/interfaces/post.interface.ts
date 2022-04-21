export interface Post {
  _id?: string,
  title: string,
  message: string,
  user: string,
  creator?: string,
  selectedFile: string,
  visited: Boolean,
};
