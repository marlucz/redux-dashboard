import { Skeleton } from "../../../components/skeleton";

const SkeletonRow = ({ withFirstItem = true }: { withFirstItem?: boolean }) => {
  return (
    <tr>
      <td>{withFirstItem && <Skeleton height="30px" />}</td>
      <td>
        <Skeleton height="30px" />
      </td>
      <td>
        <Skeleton height="30px" />
      </td>
      <td>
        <Skeleton height="30px" />
      </td>
      <td>
        <Skeleton height="30px" />
      </td>
    </tr>
  );
};

export const TableSkeleton = () => {
  return (
    <>
      {Array(3)
        .fill(true)
        .map((_, index) => (
          <tbody key={index}>
            <SkeletonRow />
            <SkeletonRow withFirstItem={false} />
          </tbody>
        ))}
    </>
  );
};
