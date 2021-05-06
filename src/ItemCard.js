import styled from "styled-components/macro";

const StyledItemCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #414142;
  padding: 12px;
  background-color: #d2d2d2;
`;

const Title = styled.div`
  font-weight: bold;
  size: 20px;
  margin-bottom: 8px;
`;

const ItemImage = styled.img`
  margin-bottom: 8px;
`;

const Text = styled.div`
  margin-bottom: 8px;
`;

const Button = styled.button`
  background-color: #009fce;
  border-radius: 16px;
  border: 0px;
  padding: 5px 8px;

  color: #fff;
`;

export const ItemCard = ({ item: { id, name, bottomText, imageUrl } }) => {
  return (
    <StyledItemCard key={id}>
      <Title>{name}</Title>
      <ItemImage src={imageUrl} />
      <Text>{bottomText}</Text>
      <Button onClick={() => console.log(`item ${id} was clicked`)}>
        Click Me
      </Button>
    </StyledItemCard>
  );
};
