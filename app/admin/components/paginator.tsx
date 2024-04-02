import useStore from "app/admin/store"
import Paging from "components/common/paginator"

const Paginator = () => {
  const { pageNumber, pageSize, total, sqlConfig, setPageNumber } = useStore((state) => state)
  if (!sqlConfig.sqlName) return null

  return (
    <Paging
      className="mt-2 flex justify-end"
      pageNumber={pageNumber}
      pageSize={pageSize}
      total={total}
      onChange={setPageNumber}
    ></Paging>
  )
}

export default Paginator
