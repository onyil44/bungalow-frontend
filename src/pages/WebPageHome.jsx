import styled, { css } from 'styled-components';
import WebPageHomePageText from '../ui/WebPageHomePageText';
import WebPageSearchBungalowHomePage from '../features/cabins/WebPageSearchBungalowFormHomePage';
import WebPageSearchBookingForm from '../features/bookings/WebPageSearchBookingForm ';
import Tabs from '../ui/Tabs';
import { device } from '../styles/bereakingPoints';
import { ENV } from '../../config/env';

const StyledAboutSection = styled.section`
  background-image: url(${ENV.APP_URL}data/imgs/homepage_1.jpg);
  background-size: 100%;
  background-position: center;
  border-radius: 3px;
  flex-grow: 1;
  display: flex;
  align-items: stretch;

  @media ${device.tablet} {
    background-image: url(${ENV.APP_URL}data/imgs/homepage_1_vertical.jpg);
    background-position: center;
  }
`;

const AboutSectionContainer = styled.div`
  background-color: var(--color-background-transparent);
  margin-right: 35rem;
  flex-grow: 1;
  clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
  padding: 1.2rem 2.4rem;

  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;

  @media ${device.laptop} {
    margin-right: 20rem;
  }

  @media ${device.tablet} {
    margin-right: 0;
  }

  @media ${device.mobileL} {
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
  }
`;

const HomePageSearchBoxContainer = styled.div`
  margin-right: 20rem;
  margin-bottom: 8rem;
  background-color: var(--color-background-hover);

  @media ${device.tabletS} {
    margin-right: undefined;
  }

  @media ${device.mobileL} {
    margin-right: 0;
  }
`;

const HomePageSearchBoxHeader = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  background-color: var(--color-background);
`;

const HomePageSearchBoxHeaderItem = styled.span`
  color: var(--color-grey-500);
  font-weight: 600;
  font-size: 1.6rem;
  padding: 1.6rem;
  cursor: pointer;

  ${(props) =>
    props.$isOpen &&
    css`
      color: var(--color-brand-500);
      background-color: var(--color-background-hover);
    `}
`;

function WebPageHome() {
  return (
    <StyledAboutSection>
      <AboutSectionContainer>
        <WebPageHomePageText />
        <HomePageSearchBoxContainer>
          <Tabs defaultOpenTab="searcBungalow">
            <HomePageSearchBoxHeader>
              <Tabs.Button opens="searcBungalow">
                <HomePageSearchBoxHeaderItem>
                  Create New Booking
                </HomePageSearchBoxHeaderItem>
              </Tabs.Button>
              <Tabs.Button opens="searchBooking">
                <HomePageSearchBoxHeaderItem>
                  Check Your Booking
                </HomePageSearchBoxHeaderItem>
              </Tabs.Button>
            </HomePageSearchBoxHeader>
            <Tabs.Window name="searcBungalow">
              <WebPageSearchBungalowHomePage />
            </Tabs.Window>
            <Tabs.Window name="searchBooking">
              <WebPageSearchBookingForm />
            </Tabs.Window>
          </Tabs>
        </HomePageSearchBoxContainer>
      </AboutSectionContainer>
    </StyledAboutSection>
  );
}

export default WebPageHome;
