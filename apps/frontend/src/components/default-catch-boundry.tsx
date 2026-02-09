import {
  ErrorComponent,
  Link,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { Button } from "./selia/button";

export function DefaultCatchBoundry({ error }: ErrorComponentProps) {
  console.error("DefaultCatchBoundary Error:", error);
  return (
    <div>
      <ErrorComponent error={error} />

      <Button
        variant="danger"
        nativeButton={false}
        render={<Link to="/">Try Again</Link>}
      />
    </div>
  );
}
