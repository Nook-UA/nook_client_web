import NookNavbar from "@/components/NookBar";


export default function layout({ children }) {
  return (
    <div className="flex flex-row justify-start">
      <NookNavbar />
      <div className="grow w-[70%]">{children}</div>
    </div>
  );
}
