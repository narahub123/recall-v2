/**
 * Number range filter value.
 *
 * 특정 숫자 필드에 대한 최소/최대 범위를 표현한다.
 */
export interface NumberRangeValue {
  /**
   * 적용 대상 필드
   */
  field?: string;

  /**
   * 최소값
   */
  min?: number;

  /**
   * 최대값
   */
  max?: number;
}

/**
 * Number range selectable field option.
 *
 * 사용자가 선택할 수 있는 숫자 필드 목록을 표현한다.
 */
export interface NumberRangeOption {
  /**
   * 실제 filter field key
   */
  value: string;

  /**
   * 사용자에게 표시되는 이름
   */
  label: string;
}
