import styled, { css } from "styled-components";

export const BirthdateFields = styled("div")`
  display: inline-grid;
  font-size: 14px;
  grid-template-columns: auto auto auto;
  grid-column-gap: 0.5em;

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input,
  select {
    font-size: 1em;
  }

  ${props =>
    !props.naked &&
    css`
      select {
        ${Select}
      }

      input {
        ${Input}
      }

      input[name="bday-day"] {
        ${InputDay}
      }

      input[name="bday-year"] {
        ${InputYear}
      }
    `}

  ${props =>
    props.error &&
    css`
      input,
      select,
      input:focus,
      select:focus {
        border-color: #c53030;
      }
    `}

  small {
    flex: 1;
    display: block;
    color: #e53e3e;
    padding: 3px 0;
  }
`;

const Select = `
  display: inline-block;
  color: #4a5568;
  line-height: 1.3;
  padding: 0.3em 1.2em 0.2em 0.6em;
  width: auto;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #e2e8f0;
  border-radius: 2px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='12' height='12' fill='none' stroke='%234A5568' stroke-width='3' style='display:inline-block;vertical-align:middle;overflow:visible;'%3E%3Cpath d='M1.0606601717798212 5 L8 11.939339828220179 L14.939339828220179 5'/%3E%3C/svg%3E");
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  &::-ms-expand {
    display: none;
  }
  &:hover {
    border-color: #a0aec0;
  }
  &:focus {
    border-color: #a0aec0;
    color: #4a5568;
    outline: none;
  }
  option {
    font-weight: normal;
  }
`;

export const Input = `
  border: 1px solid #e2e8f0;
  padding: 0.3em 0.6em;
  border-radius: 2px;
  outline: none;
  color: #4a5568;

  &:disabled {
    background: #f7fafc;
    &::placeholder {
      color: #cbd5e0;
    }
  }

  &:focus {
    border-color: #a0aec0;
  }

  &:invalid {
    border-color: #e53e3e;
  }
`;

export const InputDay = `
  min-width: 2em;
`;

export const InputYear = `
  min-width: 3em;
`;
