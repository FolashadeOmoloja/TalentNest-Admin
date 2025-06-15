import CTABTN from "../CTA-Button";

const ConfirmCard = ({
  cta,
  ctaBtn,
  actionFunc,
  handleClose,
  loading = false,
}: {
  cta: string;
  ctaBtn: string;
  actionFunc: () => void;
  handleClose: () => void;
  loading: boolean;
}) => {
  return (
    <div className="sm:h-[200px] h-full text-center flex-col centered">
      <p className="text-lg font-bold text-[#010D3E] ">{cta}</p>
      <div className="mt-8 flex gap-3 max-sm:flex-col ">
        <CTABTN
          route={""}
          isFunc
          func={actionFunc}
          CTA={ctaBtn}
          backGround="bg-[#001E80]"
          width="sm:w-[170px] w-full hover:bg-[#001E80]/95  transition ease-in text-sm font-semibold"
          height2="h-[40px]"
          disabled={loading}
          loading={loading}
        />
        <CTABTN
          route={""}
          isFunc
          func={handleClose}
          CTA={"Cancel"}
          backGround="bg-red-600"
          width="sm:w-[170px] w-full hover:bg-red-700 transition ease-in text-sm font-semibold"
          height2="h-[40px]"
        />
      </div>
    </div>
  );
};

export default ConfirmCard;
