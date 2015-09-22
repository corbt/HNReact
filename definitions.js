type Action = {
  type: string,
  value: any
}

type CommentData = {
  comments: Array<CommentData>,
  id: number,
  user: string,
  time: number,
  time_ago: string,
  content: string,
}

type Story = {
  comments: Array<CommentData>,
  id: number,
  title: string,
  user: string,
  comments_count: number,
  points: number,
  time_ago: string,
}