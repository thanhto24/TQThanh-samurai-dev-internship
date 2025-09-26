import { useAppSelector } from "@/lib/hooks"
import { Link } from "react-router-dom";
type Contact = { name: string; contact: number }

function ContactList({ title, contacts }: { title: string; contacts: Contact[] }) {
  return (
    <div className="border rounded-lg shadow-sm w-full max-w-full">
      <div className="flex items-center justify-between  border-b border-border p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="p-4">
        <ul className="max-h-80">
          {contacts.map((c, idx) => (
            <li
              key={idx}
              className="flex justify-between py-2 border-b border-border last:border-0 text-sm sm:text-base"
            >
              <Link to="#" className="text-primary flex w-full items-center justify-between">{c.name}
                <span className="font-semibold">{c.contact}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ListContact() {
  const { peopleData, companyData } = useAppSelector((state) => state.chart)

  const contactMap: Record<string, number> = {}
    ;[...peopleData, ...companyData].forEach((dataPerDate) => {
      dataPerDate.name.forEach((name) => {
        contactMap[name] = (contactMap[name] || 0) + 1
      })
    })

  const contactList: Contact[] = Object.entries(contactMap)
    .map(([name, contact]) => ({ name, contact }))
    .sort((a, b) => b.contact - a.contact)

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ContactList title="Most visited contacts" contacts={contactList.slice(0, 5)} />
      <ContactList title="Least visited contacts" contacts={contactList.slice(-5)} />
    </div>
  )
}
