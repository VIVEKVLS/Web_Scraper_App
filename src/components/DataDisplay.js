import React, { useState } from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DisplayHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DisplayTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
`;

const DataCount = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const DisplayContent = styled.div`
  padding: 2rem;
  max-height: 600px;
  overflow-y: auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const EmptySubtext = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const DataGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const DataCard = styled.div`
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 10px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  color: #333;
  font-size: 1.1rem;
  margin: 0;
  line-height: 1.4;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

const SourceTag = styled.span`
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
`;

const Timestamp = styled.span`
  color: #999;
  font-size: 0.8rem;
`;

const CardContent = styled.div`
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const CardLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  margin-top: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border: 1px solid #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }
`;

const DataDisplay = ({ data, error, onClearError }) => {
  const [filter, setFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Data' },
    { key: 'news', label: '📰 News' },
    { key: 'quotes', label: '💬 Quotes' },
    { key: 'weather', label: '🌤️ Weather' },
    { key: 'general', label: '📄 General' }
  ];

  const filteredData = filter === 'all' 
    ? data 
    : data.filter(item => item.type === filter);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (error) {
    return (
      <DisplayContainer>
        <ErrorMessage>
          <span>⚠️ {error}</span>
          <CloseButton onClick={onClearError}>×</CloseButton>
        </ErrorMessage>
      </DisplayContainer>
    );
  }

  return (
    <DisplayContainer>
      <DisplayHeader>
        <DisplayTitle>📊 Scraped Data</DisplayTitle>
        <DataCount>{filteredData.length} items</DataCount>
      </DisplayHeader>

      <DisplayContent>
        {data.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>No data scraped yet</EmptyText>
            <EmptySubtext>
              Use the form on the left to start scraping data from websites
            </EmptySubtext>
          </EmptyState>
        ) : (
          <>
            <FilterContainer>
              {filters.map(filterOption => (
                <FilterButton
                  key={filterOption.key}
                  active={filter === filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                >
                  {filterOption.label}
                </FilterButton>
              ))}
            </FilterContainer>

            <DataGrid>
              {filteredData.map((item, index) => (
                <DataCard key={index}>
                  <CardHeader>
                    <CardTitle>{item.title || 'Untitled'}</CardTitle>
                    <CardMeta>
                      <SourceTag>{item.source}</SourceTag>
                      <Timestamp>{formatTimestamp(item.timestamp)}</Timestamp>
                    </CardMeta>
                  </CardHeader>
                  <CardContent>
                    {truncateText(item.content || item.description || 'No content available')}
                  </CardContent>
                  {item.url && (
                    <CardLink href={item.url} target="_blank" rel="noopener noreferrer">
                      🔗 View Original
                    </CardLink>
                  )}
                </DataCard>
              ))}
            </DataGrid>
          </>
        )}
      </DisplayContent>
    </DisplayContainer>
  );
};

export default DataDisplay; 