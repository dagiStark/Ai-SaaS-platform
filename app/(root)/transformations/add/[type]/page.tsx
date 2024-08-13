import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AddTransformationType = async ({
  params: { type },
}: SearchParamProps) => {

  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  
  const transformation = transformationTypes[type];
  return (
    <section>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <TransformationForm
        action="Add"
        userId={user._id}
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </section>
  );
};

export default AddTransformationType;
