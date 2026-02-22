import Header from "../Header";

export default function HeaderExample() {
  return (
    <div className="relative w-full h-[200px] bg-background overflow-hidden">
      <Header />
      <div className="pt-20 p-4 text-center">
        <p className="text-muted-foreground">قم بالتمرير لرؤية تأثير الهيدر</p>
      </div>
    </div>
  );
}
