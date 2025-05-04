export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;
  
    const filter = {};
  
    if (contactType) {
      filter.contactType = contactType;
    }
  
    if (typeof isFavourite !== 'undefined') {
      filter.isFavourite = isFavourite === 'true';
    }
  
    return filter;
  };