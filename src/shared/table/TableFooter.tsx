import NextIcon from "@/assets/icons/NextIcon";
import PrevIcon from "@/assets/icons/PrevIcon";
import {
  Button,
  Pagination,
  PaginationItemType,
  type PaginationProps,
} from "@nextui-org/react";

interface IPaginator {
  paginationProps: PaginationProps;
}
const TableFooter = ({ paginationProps }: IPaginator) => {
  return (
    <div className="flex  justify-center mt-10 w-full ">
      <Pagination
        {...paginationProps}
        showControls
        className="bg-transparent gap-5 overflow-hidden  items-center flex"
        radius="full"
        renderItem={({
          ref,
          key,
          value,
          isActive,
          onNext,
          onPrevious,
          setPage,
          className,
        }) => {
          if (value === PaginationItemType.PREV)
            return (
              <Button
                onClick={onPrevious}
                key={key}
                style={{
                  borderRadius: "9999px",
                  minWidth: "50px",
                  height: "50px",
                }}
              >
                <PrevIcon />
              </Button>
            );
          if (value === PaginationItemType.NEXT)
            return (
              <Button
                onClick={onNext}
                key={key}
                style={{
                  borderRadius: "9999px",
                  minWidth: "50px",
                  height: "50px",
                }}
              >
                <NextIcon />
              </Button>
            );
          return (
            <Button
              onClick={() => {
                typeof value === "number" ? setPage(value) : null;
              }}
              key={key}
              className="bg-title-login"
              style={
                isActive
                  ? {
                      borderRadius: "9999px",
                      minWidth: "50px",
                      height: "50px",
                      border: "solid 2px #e3026f",
                      color: "#e3026f",
                    }
                  : { borderRadius: "9999px", minWidth: "50px", height: "50px" }
              }
            >
              <b>{value}</b>
            </Button>
          );
        }}
      />
    </div>
  );
};
export default TableFooter;
