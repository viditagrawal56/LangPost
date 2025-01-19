export type NGram = string[];

export class BLEUCalculator {
  private static getNGrams(sentence: string, n: number): NGram[] {
    // Split sentence into tokens (works for any language as long as words are space-separated)
    const tokens = sentence.trim().split(/\s+/);
    const nGrams: NGram[] = [];

    for (let i = 0; i <= tokens.length - n; i++) {
      nGrams.push(tokens.slice(i, i + n));
    }

    return nGrams;
  }

  private static countNGrams(nGrams: NGram[]): Map<string, number> {
    const counts = new Map<string, number>();

    for (const nGram of nGrams) {
      const key = nGram.join(" ");
      counts.set(key, (counts.get(key) || 0) + 1);
    }

    return counts;
  }

  private static calculateModifiedPrecision(
    candidateNGrams: NGram[],
    referenceNGrams: NGram[]
  ): number {
    const candidateCounts = this.countNGrams(candidateNGrams);
    const referenceCounts = this.countNGrams(referenceNGrams);

    let clippedCount = 0;
    let totalCount = 0;

    for (const [nGram, count] of candidateCounts) {
      const maxReferenceCount = referenceCounts.get(nGram) || 0;
      clippedCount += Math.min(count, maxReferenceCount);
      totalCount += count;
    }

    return totalCount === 0 ? 0 : clippedCount / totalCount;
  }

  private static calculateBrevityPenalty(
    candidateLength: number,
    referenceLength: number
  ): number {
    if (candidateLength > referenceLength) {
      return 1;
    }
    return Math.exp(1 - referenceLength / candidateLength);
  }

  static calculateBLEU(
    candidate: string,
    reference: string,
    maxNGram: number = 4,
    weights?: number[]
  ): number {
    // Default weights if not provided
    const defaultWeights = Array(maxNGram).fill(1 / maxNGram);
    const useWeights = weights || defaultWeights;

    if (useWeights.length !== maxNGram) {
      throw new Error("Number of weights must match maxNGram");
    }

    const candidateTokens = candidate.trim().split(/\s+/);
    const referenceTokens = reference.trim().split(/\s+/);

    // Calculate brevity penalty
    const brevityPenalty = this.calculateBrevityPenalty(
      candidateTokens.length,
      referenceTokens.length
    );

    // Calculate modified precisions for different n-gram sizes
    let totalScore = 0;
    for (let n = 1; n <= maxNGram; n++) {
      const candidateNGrams = this.getNGrams(candidate, n);
      const referenceNGrams = this.getNGrams(reference, n);

      const precision = this.calculateModifiedPrecision(
        candidateNGrams,
        referenceNGrams
      );

      if (precision > 0) {
        totalScore += useWeights[n - 1] * Math.log(precision);
      }
    }

    // Calculate final BLEU score
    const bleuScore = brevityPenalty * Math.exp(totalScore);
    return Math.min(1, Math.max(0, bleuScore)); // Clamp between 0 and 1
  }

  // Utility method to calculate BLEU with multiple references
  static calculateMultiReferenceBLEU(
    candidate: string,
    references: string[],
    maxNGram: number = 4,
    weights?: number[]
  ): number {
    if (references.length === 0) {
      throw new Error("At least one reference is required");
    }

    // Calculate BLEU score against each reference and take the maximum
    const scores = references.map((reference) =>
      this.calculateBLEU(candidate, reference, maxNGram, weights)
    );

    return Math.max(...scores);
  }
}

// // Example usage
// function example(): void {
//   // Works with any language as long as words are space-separated
//   const candidate = "मैं आज बहुत खुश हूं";
//   const reference = "मैं आज बेहद खुश हूं";

//   const bleuScore = BLEUCalculator.calculateBLEU(candidate, reference);
//   console.log(`BLEU Score: ${bleuScore}`);

//   // Multiple references example
//   const references = ["मैं आज बेहद खुश हूं", "मैं आज बहुत प्रसन्न हूं"];
//   const multiRefScore = BLEUCalculator.calculateMultiReferenceBLEU(
//     candidate,
//     references
//   );
//   console.log(`Multi-reference BLEU Score: ${multiRefScore}`);
// }
