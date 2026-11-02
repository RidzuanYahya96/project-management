import ProjectClient from "./ProjectClient";

export const instant = false;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Project({ params }: Props) {
  const { id } = await params;

  return <ProjectClient id={id} />;
}