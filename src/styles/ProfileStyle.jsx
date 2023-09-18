import { styled } from "styled-components";


export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) { 
    flex-direction: column;
    align-items: center;
  }
`;

export const VenuesContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
gap: 20px;
padding-top:20px;
`

export const LeftColumn = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    margin-bottom: 20px;
  }
`;

export const RightColumn = styled.div`
  flex: 0 0 65%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    padding-top: 0;
  }
`;

export const ProfileHeader = styled.h1`
  margin-bottom: 10px;
`;

export const AvatarImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    width: 300px;
 
  }
`;