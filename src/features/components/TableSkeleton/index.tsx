import { Skeleton } from "../../../components/skeleton";

const SkeletonRow = ({ withFirstItem = true }: { withFirstItem?: boolean }) => {
  return (
    <tr>
      <td>{withFirstItem && <Skeleton height="35px" />}</td>
      <td>
        <Skeleton height="35px" />
      </td>
      <td>
        <Skeleton height="35px" />
      </td>
      <td>
        <Skeleton height="35px" />
      </td>
      <td>
        <Skeleton height="35px" />
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
          <tbody key={index} className="border-t" data-testid="skeleton">
            <SkeletonRow />
            <SkeletonRow withFirstItem={false} />
          </tbody>
        ))}
    </>
  );
};
