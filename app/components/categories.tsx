import {Button} from "@/components/ui/button";
import {number} from "prop-types";

interface setData {
  id: number
  refId: number
  name: string
}

const Categories = (categories: [], selectedCategory: number, selectCategoryHandle: any ) => {
  return (
      <div className={"flex gap-3 overflow-scroll justify-between p-3 max-w-[50%]"}>
        {categories.map((val: setData, key: number) => (
            <Button
                key={key}
                id={val.id.toString()}
                className={(selectedCategory === key ? "bg-primary" : "bg-transparent hover:bg-[#386EDC] text-inactive-text font-light") + " rounded-3xl m-0 py-3 px-4"}
                onClick={() => selectCategoryHandle(key)}>{val.name}</Button>
        ))}
      </div>
  )
}

export default Categories