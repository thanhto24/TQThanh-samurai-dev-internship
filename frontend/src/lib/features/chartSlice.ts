import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";

type ChartPoint = { time_: string; contact: number; name: string[] };
type DateRange = { from?: string; to?: string };

interface ChartState {
  peopleData: ChartPoint[];
  companyData: ChartPoint[];
  range: DateRange;
  totalPeople: number;
  totalCompany: number;
}

// Mock names
const peopleNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eva",
  "Frank",
  "Grace",
  "Hannah",
  "Ian",
  "Jane",
  "Kevin",
  "Lily",
  "Mike",
  "Nina",
  "Oscar",
  "Paul",
  "Quinn",
  "Rachel",
  "Sam",
  "Tina",
];
const companyNames = [
  "Acme Corp",
  "Beta Ltd",
  "Gamma Inc",
  "Delta LLC",
  "Epsilon Co",
  "Zeta Group",
  "Eta Solutions",
  "Theta Tech",
  "Iota Systems",
  "Kappa Labs",
  "Lambda Works",
  "Mu Enterprises",
  "Nu Dynamics",
  "Xi Global",
  "Omicron Partners",
  "Pi Industries",
  "Rho Services",
  "Sigma Ventures",
  "Tau Holdings",
  "Upsilon Ltd",
];

const generatedData: Record<
  string,
  { people: ChartPoint; company: ChartPoint }
> = {};

function getRandomDataForDate(date: string) {
  if (!(date in generatedData)) {
    // Random tổng số contact
    const totalPeopleContact = Math.floor(Math.random() * 10);
    const totalCompanyContact = Math.floor(Math.random() * 5);

    // Random nguoi, cong ty contact
    const shuffledPeople = peopleNames
      .sort(() => 0.5 - Math.random())
      .slice(0, totalPeopleContact);
    const shuffledCompany = companyNames
      .sort(() => 0.5 - Math.random())
      .slice(0, totalCompanyContact);

    const people: ChartPoint = {
      name: shuffledPeople,
      contact: totalPeopleContact,
      time_: date,
    };

    const company: ChartPoint = {
      name: shuffledCompany,
      contact: totalCompanyContact,
      time_: date,
    };

    generatedData[date] = { people, company };
  }
  return generatedData[date];
}

function generateRangeData(from: string, to: string) {
  const people: ChartPoint[] = [];
  const company: ChartPoint[] = [];

  let current = new Date(from);
  const end = new Date(to);

  while (current <= end) {
    const key = format(current, "yyyy-MM-dd");
    const { people: p, company: c } = getRandomDataForDate(key);
    people.push(p);
    company.push(c);
    current = addDays(current, 1);
  }

  return { people, company };
}

function calcTotals(people: ChartPoint[], company: ChartPoint[]) {
  const totalPeople = people.reduce((sum, p) => sum + p.contact, 0);
  const totalCompany = company.reduce((sum, c) => sum + c.contact, 0);
  return { totalPeople, totalCompany };
}

const initialRange: DateRange = {
  from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
  to: new Date().toISOString(),
};

const initialData = generateRangeData(initialRange.from!, initialRange.to!);

const initialTotals = calcTotals(initialData.people, initialData.company);

const initialState: ChartState = {
  peopleData: initialData.people,
  companyData: initialData.company,
  range: initialRange,
  totalPeople: initialTotals.totalPeople,
  totalCompany: initialTotals.totalCompany,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setRange(state, action: PayloadAction<DateRange>) {
      state.range = action.payload;
      if (action.payload.from && action.payload.to) {
        const { people, company } = generateRangeData(
          action.payload.from,
          action.payload.to
        );
        state.peopleData = people;
        state.companyData = company;
        const totals = calcTotals(people, company);
        state.totalPeople = totals.totalPeople;
        state.totalCompany = totals.totalCompany;
      }
    },
  },
});

export const { setRange } = chartSlice.actions;
export default chartSlice.reducer;
