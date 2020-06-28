import React, { useState } from 'react';
import { Container, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../media/search.svg';
import breaks from '../styles/breaks';
import { appBlueLight, gray } from '../styles/colors';
import { ENTER, ARROW_UP, ARROW_DOWN } from '../utils/constants';

const Wrapper = styled.div`
  position: relative;
  margin: auto;
  @media ${breaks.break1} {
    width: 100%;
  }
  @media ${breaks.break2} {
    width: 80%;
  }
  @media ${breaks.break3} {
    width: 50%;
  }

  .was-validated .form-control:invalid,
  .form-control.is-invalid {
    border-color: #80bdff;
    background-image: unset;
  }
  .was-validated .form-control:invalid:focus,
  .form-control.is-invalid:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const ListWrapper = styled.div`
  position: relative;
  .list-group {
    width: 100%;
    position: absolute;
    z-index: 1000;
  }

  .list-group-item {
    cursor: default;
  }

  .list-group-item.active {
    background-color: ${appBlueLight};
    border-color: ${appBlueLight};
  }
`;

const SearchWrapper = styled(InputGroup)`
  margin-top: 1rem;
  .form-control {
    padding-left: 2.75rem;
  }
  margin: auto;
  width: 100%;
`;

const SearchInput = styled(FormControl)`
  border-radius: 0.25rem !important;
`;

const InnerIcon = styled.span`
  position: absolute;
  top: 6px;
  left: 10px;
  cursor: default;
  z-index: 100;

  svg {
    fill: ${gray};
    width: 28px;
    opacity: 0.8;
  }
`;

const Autocomplete = props => {
  const { userInput, setUserInput, suggestions, selectSuggestions } = props;
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputIsInValid, setInputIsInValid] = useState(false);

  const onChange = e => {
    const { value } = e.target;
    setInputIsInValid(false);
    if (value && !/^[a-z ]+$/i.test(value)) {
      setInputIsInValid(true);
      return;
    }
    setActiveSuggestion(0);
    setShowSuggestions(true);
    setUserInput(value);
  };

  const onClick = clickedValue => {
    setActiveSuggestion(0);
    setShowSuggestions(false);
    setUserInput('');
    selectSuggestions(
      suggestions.find(suggestion => suggestion.display === clickedValue)
    );
  };

  const onKeyUp = e => {
    if (e.key === ENTER) {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput('');
      selectSuggestions(suggestions[activeSuggestion]);
    } else if (e.key === ARROW_UP) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    } else if (e.key === ARROW_DOWN) {
      if (activeSuggestion >= suggestions.length - 1) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    suggestionsListComponent = (
      <ListGroup as="ul">
        {suggestions.map((suggestion, i) => (
          <ListGroup.Item
            as="li"
            active={i === activeSuggestion}
            key={suggestion.Key}
            onClick={() => onClick(suggestion.display)}
          >
            {suggestion.display}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  return (
    <Container fluid>
      <Wrapper>
        <SearchWrapper>
          <SearchInput
            aria-label="search"
            type="search"
            placeholder="Search..."
            onChange={onChange}
            onKeyDown={onKeyUp}
            value={userInput}
            isInvalid={inputIsInValid}
          />
          <FormControl.Feedback type="invalid" className="text-white">
            Please enter only english characters.
          </FormControl.Feedback>
          <InputGroup.Append>
            <InnerIcon>
              <SearchIcon />
            </InnerIcon>
          </InputGroup.Append>
        </SearchWrapper>
        <ListWrapper>{suggestionsListComponent}</ListWrapper>
      </Wrapper>
    </Container>
  );
};

export default Autocomplete;
