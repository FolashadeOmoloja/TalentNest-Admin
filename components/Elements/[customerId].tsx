import React, { useEffect, useMemo, useState } from 'react';
import Table from "../../../ui/molecules/table/table";
import { DashboardLayout } from '../../../ui/layout/dashboard-layout'; 
import { useRouter } from 'next/router';
import { LoanDetailsCard } from '../../../ui/molecules/cards/cards';
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import ColumnFilterComponent  from "../../../ui/molecules/table/column-filter";
import { Avatar } from "../../../ui/atoms/avatar/avatar";
import AvatarImage from "../../../ui/assets/avatar.png";
import { getSinglePersonData } from '../../../hooks/searchUser-hook';
import { decryptData, moneyFormatter } from '../../../utilities/functions';
import ProgressBar from '../../../ui/atoms/progress-bar/circle-bar';
import dayjs from 'dayjs';




const FlexContainer = styled.div`
display: flex;
gap: 30px;
width: 100%;
flex-wrap: wrap;
`

const SwitchContainer = styled.div`
width:22px; 
height: 88px; 
background: #ECF7EA; 
border-top-right-radius: 10px;
border-top-left-radius: 10px;
border-bottom-left-radius: 10px; 
border-bottom-right-radius: 10px; 
position: absolute;
right: 30px;
bottom:50px;



.switch-on{
  width: 22px;
  height: 44px;
  background: #38AF00;
  border-top-right-radius: 10px;
border-top-left-radius: 10px;
border-bottom-left-radius: 10px; 
border-bottom-right-radius: 10px; 
transition:  all 0.1s ease ;


}

`

const Paragraph = styled.p`
display:flex;
align-items:center;
font-size:12px;
`;
const Span = styled.span`
margin-left:25px;
font-weight:600;
`;
const Rating = styled.span`
margin-left:10px;
`;
const AvatarDiv = styled.div`
@media screen and (max-width:500px){
display:none;
}


 `;

const Search = () => {
  const router = useRouter();
  const {userName} = router.query;
  const id = decryptData(decodeURIComponent(router.query.customerId as string));
  const {data, newData} =  getSinglePersonData(id);
  const customerData = data?.data || [];
  const loanArray = newData?.loans;


  function getDuration(start: Date, end: Date): string {
    const durationInDays = Math.round((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    if (durationInDays <= 7) {
      return `${durationInDays} days`;
    } else if (durationInDays <= 28) {
      const durationInWeeks = Math.round(durationInDays / 7);
      return `${durationInWeeks} weeks`;
    } else if (durationInDays <= 365) {
      const durationInMonths = Math.round(durationInDays / 30);
      return `${durationInMonths} months`;
    } else {
      const durationInYears = Math.round(durationInDays / 365);
      return `${durationInYears} years`;
    }
  }  

  const dbData = useMemo(() => {
    return loanArray?.map((loan: any) => {
      const start = new Date(loan?.paymentStartDate);
      const end = new Date(loan?.paymentEndDate);
      const duration = getDuration(start, end);
      return {
        name: loan?.loanType?.company?.name,
        imageUrl: loan?.loanType?.company?.imageUrl,
        amountBorrowed: loan?.amountBorrowed,
        paymentEndDate: dayjs(loan?.paymentEndDate).format("DD MMM, YYYY"),
        paymentStartDate: dayjs(loan?.paymentStartDate).format("DD MMM, YYYY"),
        loanType:  loan?.loanType?.type,
        loanPeriod: duration
      };
    });
  }, [loanArray]);

    const columns = [
      {
        Header: "",
        accessor: "7",
        disableFilters: true
      },
      {
        Header: "Company",
        accessor: "name",
        Cell: ({ row }: any) => {
          return (
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <Avatar
        name={row.original.name}
        src={row.original.imageUrl ? row.original.imageUrl : AvatarImage.src}
        size="md" />
              <span>{row.original?.name}</span>
              </div>
          )
        },
        disableFilters: true,
      },
      {
        Header: "Loan Type",
        accessor: "loanType",
        disableFilters: true
      },
      {
        Header: "Amount Borrowed",
        accessor: "amountBorrowed",
        Cell: ({ row }: any) => (
          <div>{moneyFormatter.format(row.original?.amountBorrowed)}</div>
        ),
        disableFilters: true,
      },
      {
        Header: "Loan Date",
        accessor: "paymentStartDate",
        disableFilters: true
      },
      {
        Header: "Loan Period",
        accessor: "loanPeriod",
        disableFilters: true,
      },
      {
        Header: "Repayment Date",
        accessor: "paymentEndDate",
        disableFilters: true
      },
      {
        Header: "",
        accessor: "$",
        disableFilters: true
      },
    ];

    const [toogleOnTop, setToogleOnTop] = useState(false)
    const [toogleOnBottom, setToogleOnBottom] = useState(true)
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
      if (newData) {
        setPercentage(toogleOnTop ? newData.currentCustomerSuccessRate : newData.othersSuccessRate);
      }
    }, [newData, toogleOnTop]);
    
    const toggleSwitchTop = () => {
      setToogleOnTop(!toogleOnTop)
      setToogleOnBottom(!toogleOnBottom)
   
    }

    const toggleSwitchBottom = () => {
      setToogleOnBottom(!toogleOnBottom)
      setToogleOnTop(!toogleOnTop)
    }

  return (
    <DashboardLayout
    navType=""
    goBack={{
      showArrow: true,
      onClick: () => router.back(),
    }}
    children={
      <div style={{paddingLeft:'20px',position:'relative', width: '100%'}}>
        <p style={{fontSize:'20px'}}><b>Customer Loan Details</b></p>
        <FlexContainer >
            <LoanDetailsCard maxWidth='400px' backgroundColor='white' height='260px'>
              <div style={{display:'flex',alignItems:'flex-start',position:'relative',height:'100%',padding:'0px 20px'}}>
                <AvatarDiv style={{marginRight:'40px'}}>
                <Avatar name="img" src={dbData[0]?.imageUrl? dbData[0]?.imageUrl : AvatarImage.src} size="lg" />
                </AvatarDiv>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:'100%'}}>
                  <Paragraph>Full Name  <Span>{newData?.firstName} {newData?.lastName}</Span></Paragraph>
                  <Paragraph>Gender <Span>{newData?.gender}</Span></Paragraph>
                  <Paragraph>City <Span>{newData?.city}</Span></Paragraph>
                  <Paragraph>State <Span>{newData?.state}</Span></Paragraph>
                </div>
              </div>
            </LoanDetailsCard>
           <div>
            <p style={{fontWeight: '700'}}>Loan Repayment Sucess Rate</p>
            <div style={{display:'flex', gap: '0px', alignItems: 'center', position: 'relative'}}>
            <div style={{display:'flex', gap: '0px'}}>
              <p style={{fontSize: '10px', margin: '0', position:'relative', top: '60px',fontWeight: `${toogleOnTop? '600': '400'}`}}>{newData?.firstName} {newData?.lastName}</p>
          <ProgressBar percentage={percentage} warningColor='#4895EF' text='' circleWidth = {250}/>
          <p style={{fontSize: '10px', margin: '0', position:'relative', top: '60px', fontWeight: `${toogleOnBottom? '600': '400'}`}}>Other People</p>
            </div>
            <SwitchContainer>
              <div style={{width: '22px', height: '44px'}} className={`${toogleOnTop? 'switch-on': ''}`} onClick={toggleSwitchTop}></div>
              <div  style={{width: '22px', height: '44px'}} className={`${toogleOnBottom? 'switch-on': ''}`} onClick={toggleSwitchBottom}></div>
            </SwitchContainer>
            <div style={{position: 'absolute', right: '-50px', bottom: '60px'}}>
              <p style={{fontWeight: `${toogleOnTop? '600': '400'}`, fontSize: '10px', marginBottom: '30px'}}>{newData?.firstName} {newData?.lastName}</p>
              <p style={{fontWeight: `${toogleOnBottom? '600': '400'}`,fontSize: '10px'}}>Other People</p>
            </div>
            </div>
           </div>
        </FlexContainer>
        <div style={{marginTop:'40px'}}>
          <p style={{fontSize:'20px'}}><b>Loans Owed</b></p>
          <div>
    {loanArray ? (
      <Table
        data={dbData}
        columns={columns}
        headerBackgroundColor="#A6DBA0"
        headerHeight="44px"
        headerfontWeight='500'
        fontSize='13px'
        setPage={(pageNumber: number) => {}}
      />
    ) : (
      <p>Loading...</p>
    )}
  </div>
        </div>
      </div>
    }
    />
  )
}

export default Search