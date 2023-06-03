export interface FrontMatter {
  title: string
  description: string
  date: string
  tags: string[]
  schedule: string
  hidden: boolean,
  path: string
}

export interface PostsCalendar {
  year: string,
  months: [
    {
      month: string,
      dates: [
        {
          date: string,
          day: string,
          post: FrontMatter
        }
      ]
    }
  ]
}
