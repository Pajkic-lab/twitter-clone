import { createGlobalStyle } from 'styled-components'
import { Colors } from 'ui/styles/styles'
import chipBold from 'fonts/chip-bold.woff'
import chipRegular from 'fonts/chip-regular.woff'

export const GlobalStyle = createGlobalStyle<{ theme: any; customCss: string }>`

  * {
    box-sizing: border-box;
    scrollbar-color: #D0D0D0 #DDDDDD59;
    scrollbar-width: thin;
  }
  *::before, *::after {
    box-sizing: inherit;
  }

  html, body {
    margin: 0;
    padding: 0;
    color: ${Colors.textColor};
    font-size: 14px;
    font-family: 'chip-regular', Verdana, "Segoe UI", Arial, sans-serif, Helvetica;
    background-color: ${Colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;  
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    line-height: 1.5;
  }

  body {
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  a {
    text-decoration: none;
    color: ${Colors.primary};
  }
  
  input, textarea {
    font-family: 'DM Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  table.table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid ${Colors.borderColor};

    th,
    td {
      margin: 0;
      padding: 0;
      border-bottom: 1px solid ${Colors.borderColor};
    }

    input,
    [data-element='dropdown'] {
      width: 100%;
      border: 0;
      border-radius: 0;
      box-shadow: none;
    }
    [data-element='dropdown'] {
      border-left: 1px solid ${Colors.borderColor};
    }
  }
  
  .table thead {
    background: ${Colors.chartTitleBackground};
    th {
      padding: 1rem;
      font-size: 14px;
      font-weight: normal;
      text-transform: uppercase;
      text-align: left;
      :last-child {
        width: 100px;
      }
    }
  }

  .table tbody {
    td:last-child {
      width: 100px;
      padding-right: 1rem;
      text-align: right;

      [data-element='icon'] {
        height: 20px;
        width: 20px;
        display: inline-flex;
        color: ${Colors.lightGray};
        background: ${Colors.backgroundShadow};
        border-radius: 50%;
        cursor: pointer;
        user-select: none;
        &:last-child {
          margin-left: 0.5rem;
        }
      }
    }
  }
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #DDDDDD59;
  }
 
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #D0D0D0;
  }
  
  table {
    div {
      cursor: default;
    }
  }

  @font-face {
        font-family: 'chip-bold';
        src: local('chip-bold'), local('woff'),
        url(${chipBold}) format('woff');
        font-weight: 700;
        font-style: normal;
    }

  @font-face {
      font-family: 'chip-regular';
      src: local('chip-regular'), local('woff'),
      url(${chipRegular}) format('woff');
      font-weight: 300;
      font-style: normal;
  }

  ${props => `${props.customCss}`}
`
