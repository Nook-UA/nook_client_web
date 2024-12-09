import NookNavbar from "@/components/NookBar/NookNavbar";


export default function layout({ children }) {
  return (
    <div className="flex flex-row justify-start">
      
      <div className="grow w-[70%]">{children}</div>
    </div>
  );
}
