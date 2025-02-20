import { useEffect, useState } from "react";
import styled from "styled-components";
import ChevronDownSVG from "@/assets/icons/chebron_down_s.svg?react";
import { requestCastsStatus } from "@/api/users";
import ApplyList from "./components/applyList";
import { RecruitsStatus } from "../mystage";

export type applyPhaseType =
  | "APPLIED"
  | "DOCUMENT_PASSED"
  | "FINAL_ACCEPTED"
  | "REJECTED"
  | "CANCEL";

export type filterType = "전체" | "APPLIED" | "CANCEL" | "READ";

const ApplyHistory = () => {
  const [recruitsStatus, setRecruitsStatus] = useState<RecruitsStatus>();
  const [selectedPhase, setSelectedPhase] = useState<applyPhaseType>("APPLIED");
  const [selectedFilter, setSelectedFilter] = useState<filterType>("전체");
  const [isFilterMenuShowing, setIsFilterMenuShowing] =
    useState<boolean>(false);

  const handlePhaseClick = (phase: applyPhaseType) => {
    setSelectedPhase(phase);
  };

  const handleFilterClick = (filter: filterType) => {
    setSelectedFilter(filter);
    setIsFilterMenuShowing(false);
  };

  const handleFilterBtnClick = () => {
    setIsFilterMenuShowing((curr) => !curr);
  };

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
    }
  };

  const parseFilterText = (filter: filterType) => {
    switch (filter) {
      case "전체":
        return "전체";
      case "APPLIED":
        return "지원완료";
      case "CANCEL":
        return "지원취소";
    }
  };

  const getCastsStatus = async () => {
    const res = await requestCastsStatus();
    setRecruitsStatus(res);
  };

  useEffect(() => {
    getCastsStatus();
  }, []);

  return (
    <ApplyHistoryContainer>
      <ApplyDashboard>
        <ItemTitle>지원 현황</ItemTitle>
        <Dashboard>
          <ApplyPhase
            onClick={() => handlePhaseClick("APPLIED")}
            $isSelected={selectedPhase === "APPLIED"}
          >
            <ItemName>지원 완료</ItemName>
            {recruitsStatus && <Value>{recruitsStatus?.applied}</Value>}
          </ApplyPhase>
          <Divider />
          <ApplyPhase
            onClick={() => handlePhaseClick("DOCUMENT_PASSED")}
            $isSelected={selectedPhase === "DOCUMENT_PASSED"}
          >
            <ItemName>서류 통과</ItemName>
            <Value>{recruitsStatus?.passed}</Value>
          </ApplyPhase>
          <Divider />
          <ApplyPhase
            onClick={() => handlePhaseClick("FINAL_ACCEPTED")}
            $isSelected={selectedPhase === "FINAL_ACCEPTED"}
          >
            <ItemName>최종 합격</ItemName>
            <Value>{recruitsStatus?.accepted}</Value>
          </ApplyPhase>
          <Divider />
          <ApplyPhase
            onClick={() => handlePhaseClick("REJECTED")}
            $isSelected={selectedPhase === "REJECTED"}
          >
            <ItemName>불합격</ItemName>
            <Value>{recruitsStatus?.rejected}</Value>
          </ApplyPhase>
        </Dashboard>
      </ApplyDashboard>
      <ApplyListWrapper>
        <TitleWrapper>
          <ItemTitle>{parsePhase(selectedPhase)}</ItemTitle>
          {selectedPhase === "APPLIED" && (
            <FilterBtnWrapper>
              <FilterBtn onClick={handleFilterBtnClick}>
                {parseFilterText(selectedFilter)} <ChevronDownSVG />
              </FilterBtn>
              {isFilterMenuShowing && (
                <FilterMenu>
                  <Option onClick={() => handleFilterClick("전체")}>
                    전체
                  </Option>
                  <Option onClick={() => handleFilterClick("READ")}>
                    열람
                  </Option>
                  <Option onClick={() => handleFilterClick("APPLIED")}>
                    미열람
                  </Option>
                  <Option onClick={() => handleFilterClick("CANCEL")}>
                    지원취소
                  </Option>
                </FilterMenu>
              )}
            </FilterBtnWrapper>
          )}
        </TitleWrapper>
        <ApplyList status={selectedPhase} filter={selectedFilter} />
      </ApplyListWrapper>
    </ApplyHistoryContainer>
  );
};

export default ApplyHistory;

const ApplyHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ItemTitle = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
  margin-bottom: 20px;
`;

const ApplyDashboard = styled.div``;

const Dashboard = styled.div`
  width: 685px;
  height: 120px;
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #eaebec;
  border-radius: 12px;
`;

const ApplyPhase = styled.div<{ $isSelected: boolean }>`
  width: 147.25px;
  height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: ${({ $isSelected }) => ($isSelected ? "#f0f7ff" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "#B81716" : "#171719")};
  border-radius: 12px;
  cursor: pointer;
`;

const ItemName = styled.div`
  font-size: 18px;
  font-weight: var(--font-regualr);
  line-height: 144.5%;
  letter-spacing: -0.02%;
`;

const Value = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
`;

const Divider = styled.div`
  width: 1px;
  height: 96px;
  background-color: #f3f3f3;
  margin: 0px 12px;
`;

const ApplyListWrapper = styled.div``;

const TitleWrapper = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid #f4f4f5;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const FilterBtnWrapper = styled.div`
  display: flex;
  gap: 4px;
  position: relative;
  width: 100px;
  justify-content: end;
`;

const FilterBtn = styled.div`
  font-weight: var(--font-semibold);
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
  color: #171719;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
`;

const FilterMenu = styled.div`
  position: absolute;
  bottom: -165px;
  right: 0;
  width: 111px;
  height: 160px;
  border-radius: 10px;
  padding: 12px 10px;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
    0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
    0 8px 16px rgba(0, 0, 0, 0.11);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Option = styled.div`
  padding: 4px 6px;
  width: 91px;
  height: 28px;
  border-radius: 5px;
  color: #37383c;
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  cursor: pointer;
`;
