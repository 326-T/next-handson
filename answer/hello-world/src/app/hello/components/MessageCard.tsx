export default function MessageCard() {
  return (
    <div className="w-fit grid grid-cols-[auto_auto_auto] gap-2 items-center">
      <span className="w-2 h-2 rounded-full bg-blue-400" />
      <span className="w-6 h-6 rounded-full bg-gray-400" />
      <span>Aさんがコメントしました。</span>
      <span className="col-span-2" />
      <span className="w-40">
        long text. long text. long text. long text. long text. long text
      </span>
      <span className="col-span-2" />
      <span>2024/08/09 15:32</span>
    </div>
  );
}
