export type SideProject = {
  name: string
  icon: string
  link: string
  desc: string
  cover: string
  shortcut: string
  plainName: string
  color: string
  screens?: string[]
}

export interface FrontMatter {
  title: string
  description: string
  date: string
  tags: string[]
  schedule: string
  hidden: boolean,
  path: string
}

export interface ThoughtsCalendar {
  year: string,
  months: [
    {
      month: string,
      dates: [
        {
          date: string,
          day: string,
          thought: FrontMatter
        }
      ]
    }
  ]
}
