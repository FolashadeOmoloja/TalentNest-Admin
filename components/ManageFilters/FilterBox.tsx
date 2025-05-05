import { FaTrashCan } from "react-icons/fa6";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface FilterBoxProps {
  initialFilter: string[];
  addHook: (data: any) => Promise<void>;
  deleteHook: (data: any) => Promise<void>;
  id: string;
}

const FilterBox: React.FC<FilterBoxProps> = ({
  initialFilter,
  addHook,
  deleteHook,
  id,
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    reset,
  } = useForm();
  const { filterLoading } = useSelector((store: any) => store.filters);

  const handleUpdateFilter = async (data: any) => {
    if (data) {
      const itemData = {
        id: id,
        item: data.item.trim(),
      };
      await addHook(itemData); // Call the addHook with the new item
      reset(); // Clear the input field after submission
    }
  };

  const handleRemove = async (item: string) => {
    const itemData = {
      id: id,
      item: item,
    };
    await deleteHook(itemData); // Call the deleteHook with the item to remove
  };

  return (
    <section className="bg-white rounded-md mt-10 p-9 max-slg:p-7 max-sm:px-4">
      <div className="flex justify-between text-[#010D3E] font-bold text-lg relative">
        <form onSubmit={handleSubmit(handleUpdateFilter)}>
          <div className="flex gap-3 formdivs mt-4">
            <input
              type="text"
              placeholder="Enter a new item"
              {...register("item", {
                required: "This is required",
              })}
            />
            <button
              type="submit"
              className="basis-[20%] p-3 bg-[#010D3E] text-white shadow-sm rounded-lg btn-hover"
              disabled={isSubmitting}
              style={{ width: "131px" }}
            >
              {filterLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </div>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
      {initialFilter.length === 0 ? (
        <p className="mt-10 text-[#010D3E] italic text-2xl">
          No data available at the moment.
        </p>
      ) : (
        <ul className="text-gray-500 font-medium mt-8 flex flex-col gap-3">
          {initialFilter.map((item, idx) => (
            <li
              className="flex justify-between cursor-pointer items-center"
              key={idx}
            >
              <span>{item}</span>
              <span
                className="text-sm text-[#010D3E]"
                onClick={() => handleRemove(item)}
              >
                <FaTrashCan />
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FilterBox;
