import styled from 'styled-components'
import Box from 'grommet/components/Box'
import { Hovercard } from '../myflashcards/localcomponents'
import Split from 'grommet/components/Split'

export const SidebarActions = () => styled(Box)`
  font-size: 18px;
  background-color: #FDD835;
  transition: background-color 0.5s ease;
  color: #fff;
  &:hover{
    background-color: #FBC02D;
    & > div > div > button > span > svg {
      fill: #000;
      stroke: #000;
    }
  }
`

export const WhiteHoverCard = styled(Hovercard)`
  min-height : 300px;
  margin-bottom : 10px;
  &:hover {
    & > div{
      background-color: #fff;
    }
  }
`
export const LineLink = styled.a`
  transition: background-color 0.5s ease;
  color: #FBC02D;
  display: inline-block;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  padding: 5px 5px;
  &:before {
    background-color: #FBC02D;
    content: '';
    height: 2px;
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    transition: width 0.3s ease-in-out;
    width: 100%;
  }
  &:hover {
    background-color: #FDD835;
    color:#fff;
    &:before {
      width: 0;
    }
  }
`
export const FlameSidebarAction = x => styled(x)`
  background-color: #FF576D;
  &:hover{
    background-color: #FF324D;
    & > div > div > button > span > svg {
      fill: #000;
      stroke: #000;
    }
  }
`

export const LightGreyTestArea = styled(Box)`
  background-color: #ebeced;
`

export const LimitedSplit = styled(Split)`
  & > div{
    height: inherit;
  }
`
