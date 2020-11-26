class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        ArrayList<Integer> dp = new ArrayList<>();
        dp.add(nums[0]);
        for (int i = 1; i < nums.length; i++) {
            if (dp.get(dp.size() - 1) < nums[i]) {
                dp.add(nums[i]);
            } else {
                int searchResult = Collections.binarySearch(dp, nums[i]);
                if (searchResult < 0) {
                    int insertionPoint = -(searchResult + 1);
                    dp.set(insertionPoint, nums[i]);
                }
            }
        }
        return dp.size();
    }
}
