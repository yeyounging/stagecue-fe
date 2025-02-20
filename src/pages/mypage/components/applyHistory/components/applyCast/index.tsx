import Button from "@/components/buttons/button";
import styled from "styled-components";
import { applyPhaseType } from "../..";
import { formatDateWithDots } from "@/utils/format";
import ModalPortal from "@/components/modal/portal";
import CancelModal from "../cancelModal";

interface ApplyCastProps {
  applyId: number;
  applyStatus: applyPhaseType;
  recruitTitle: string;
  troupeName: string;
  applyStatusLogs: { applyStatus: applyPhaseType; historyAt: string }[];
  onClickCancel: (applyId: number) => void;
  onConfirm: (applyId: number) => void;
  onClose: () => void;
  isModalOpen: boolean;
}

const ApplyCast = ({
  applyId,
  applyStatus,
  recruitTitle,
  applyStatusLogs,
  troupeName,
  onClickCancel,
  onConfirm,
  onClose,
  isModalOpen,
}: ApplyCastProps) => {
  const parsePhase = (status: applyPhaseType) => {
    switch (status) {
      case "APPLIED":
        return "지원 완료";
      case "DOCUMENT_PASSED":
        return "서류 통과";
      case "FINAL_ACCEPTED":
        return "최종 합격";
      case "REJECTED":
        return "불합격";
      case "CANCEL":
        return "지원취소";
    }
  };

  const parseLogname = (status: applyPhaseType) => {
    switch (status) {
      case "APPLIED":
        return "지원일자";
      case "DOCUMENT_PASSED":
        return "열람일자";
      case "FINAL_ACCEPTED":
        return "최종 합격";
      case "REJECTED":
        return "열람일자";
      case "CANCEL":
        return "취소일자";
    }
  };

  return (
    <ApplyCastContainer>
      {isModalOpen && (
        <ModalPortal>
          <CancelModal onConfirm={() => onConfirm} onClose={onClose} />
        </ModalPortal>
      )}
      <ApplyInfoWrapper>
        <TagsWrapper>
          <TroupeTag>{troupeName}</TroupeTag>
          <StatusTag $status={applyStatus}>{parsePhase(applyStatus)}</StatusTag>
        </TagsWrapper>
        <Title>{recruitTitle}</Title>
        <LogWrapper>
          {applyStatusLogs.map(({ applyStatus, historyAt }, index) => (
            <>
              <Log>
                <LogName>{parseLogname(applyStatus)}</LogName>
                <LogDate>{formatDateWithDots(historyAt)}</LogDate>
              </Log>
              {index !== applyStatusLogs.length - 1 && <Divider />}
            </>
          ))}
        </LogWrapper>
      </ApplyInfoWrapper>
      <Button
        variation="outlined"
        btnClass="assistive"
        width={75}
        height={32}
        fontWeight="--var(font-medium)"
        fontSize={13}
        lineHeight={138.5}
        letterSpacing={1.94}
        padding="7px 14px"
        onClick={() => onClickCancel(applyId)}
        disabled={applyStatus === "CANCEL"}
      >
        {applyStatus === "REJECTED" ? "서류회수" : "지원취소"}
      </Button>
    </ApplyCastContainer>
  );
};

export default ApplyCast;

const ApplyCastContainer = styled.div`
  width: 685px;
  height: 128px;
  border: 1px solid #f4f4f5;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
`;

const Title = styled.div`
  color: #000000;
  font-size: 18px;
  font-weight: var(--font-semibold);
  line-height: 144.5%;
  letter-spacing: -0.02%;
  margin-bottom: 12px;
`;

const ApplyInfoWrapper = styled.div`
  width: 567px;
  height: 96px;
  display: flex;
  flex-direction: column;
`;

const TagsWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
`;

const TroupeTag = styled.div`
  width: fit-content;
  height: 24px;
  padding: 4px 9px;
  border-radius: 4px;
  border: 1px solid #e0e0e2;
  font-size: 12px;
  font-weight: var(--font-medium);
  line-height: 133.4%;
  letter-spacing: 2.52%;
  color: #171719;
`;

const StatusTag = styled.div<{ $status: applyPhaseType }>`
  font-size: 12px;
  font-weight: var(--font-semibold);
  width: 62px;
  height: 24px;
  border-radius: 4px;
  color: ${({ $status }) =>
    $status === "DOCUMENT_PASSED" || $status === "FINAL_ACCEPTED"
      ? "#00BF40"
      : "#989ba2"};
  background-color: ${({ $status }) =>
    $status === "DOCUMENT_PASSED" || $status === "FINAL_ACCEPTED"
      ? "#D9FFE6"
      : "#f7f7f8"};
  line-height: 133.4%;
  letter-spacing: 2.52%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Log = styled.div`
  width: 128px;
  height: 24px;
  color: #989ba2;
  font-size: 14px;
  font-weight: var(--font-medium);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  display: flex;
  gap: 4px;
`;

const LogName = styled.div``;

const LogDate = styled.div``;

const Divider = styled.div`
  height: 20px;
  width: 1px;
  background-color: #f4f4f5;
`;
