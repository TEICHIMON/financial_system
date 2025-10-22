import Mock from 'mockjs';

export const setupForceInputMock = () => {
  // Validate file API
  Mock.mock(/\/api\/force-input\/validate/, 'post', () => {
    const hasError = Math.random() > 0.7; // 30% chance of error
    
    return {
      code: 200,
      message: '検証完了',
      data: {
        valid: !hasError,
        totalRecords: Mock.Random.integer(50, 200),
        errorCount: hasError ? Mock.Random.integer(1, 10) : 0,
        errors: hasError ? Mock.mock({
          'items|1-5': [{
            row: '@integer(1, 200)',
            column: '@pick(["取引番号", "金額", "顧客コード"])',
            message: '@pick(["形式が正しくありません", "必須項目です", "値が不正です"])',
          }]
        }).items : [],
      },
    };
  });

  // Upload file API
  Mock.mock(/\/api\/force-input\/upload/, 'post', () => {
    return {
      code: 200,
      message: 'アップロード成功',
      data: {
        batchId: Mock.Random.guid(),
        processedRecords: Mock.Random.integer(50, 200),
        successCount: Mock.Random.integer(45, 195),
        failureCount: Mock.Random.integer(0, 5),
      },
    };
  });
};
