import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { addDays, format } from "date-fns"

type ChartPoint = { time_: string; contact: number }
// Lưu từ/to dưới dạng string ISO để serializable
type DateRange = { from?: string; to?: string }

interface ChartState {
  peopleData: ChartPoint[]
  companyData: ChartPoint[]
  range: DateRange
}

const generatedData: Record<string, { people: number; company: number }> = {}

function getRandomDataForDate(date: string) {
  if (!(date in generatedData)) {
    generatedData[date] = {
      people: Math.floor(Math.random() * 50),
      company: Math.floor(Math.random() * 30),
    }
  }
  return generatedData[date]
}

function generateRangeData(from: string, to: string) {
  const people: ChartPoint[] = []
  const company: ChartPoint[] = []

  let current = new Date(from)
  const end = new Date(to)

  while (current <= end) {
    const key = format(current, "yyyy-MM-dd")
    const { people: p, company: c } = getRandomDataForDate(key)
    people.push({ time_: key, contact: p })
    company.push({ time_: key, contact: c })
    current = addDays(current, 1)
  }

  return { people, company }
}

// Lưu ISO, không lưu Date object để tránh lỗi serializable
const initialRange: DateRange = {
  from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
  to: new Date().toISOString(),
}

const initialData = initialRange.from && initialRange.to
  ? generateRangeData(initialRange.from, initialRange.to)
  : { people: [], company: [] }

const initialState: ChartState = {
  peopleData: initialData.people,
  companyData: initialData.company,
  range: initialRange,
}

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setRange(state, action: PayloadAction<DateRange>) {
      state.range = action.payload
      if (action.payload.from && action.payload.to) {
        const { people, company } = generateRangeData(action.payload.from, action.payload.to)
        state.peopleData = people
        state.companyData = company
      }
    },
  },
})

export const { setRange } = chartSlice.actions
export default chartSlice.reducer
