import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

async function main() {
  try {
    console.log("Knowledge Object relation candidate test started");

    const { connectMongoDB } = await import("@/lib/mongodb");

    const { knowledgeObjectRelationService } =
      await import("@/services/knowledge-object-relation.service");

    await connectMongoDB();

    const knowledgeObjectId = "6a5e2f4a68bda71405839a0e";

    const result =
      await knowledgeObjectRelationService.generateRelations(knowledgeObjectId);

    console.log("Target Knowledge Object:");

    console.log({
      id: result.target._id.toString(),

      name: result.target.name,

      description: result.target.description,

      noteId: result.target.noteId,
    });

    console.log("\nCandidate Knowledge Objects:");

    console.dir(
      result.candidates.map((candidate) => ({
        id: candidate._id.toString(),

        name: candidate.name,

        description: candidate.description,

        noteId: candidate.noteId,

        score: candidate.score,
      })),
      {
        depth: null,
      },
    );

    console.log("\nKnowledge Object relation candidate test completed:");
  } catch (error) {
    console.error("Knowledge Object relation candidate test failed", error);

    process.exit(1);
  }

  process.exit(0);
}

main();
