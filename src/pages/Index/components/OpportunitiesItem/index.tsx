import React from 'react';
// TS
import { IOpportunity } from '../../interfaces';
import { EDurationNames, EDurationType, EProgramShortNames } from '../../enums';
// Icons
import { GtaIcon, GteIcon, GvIcon } from '../../../../assets/icons';

export const OpportunityItem: React.FC<{ opportunity: IOpportunity }> = ({
  opportunity: {
    cover_photo: { url: image_url },
    title,
    programme,
    description,
    location,
    opportunity_duration_type: duration,
    branch,
  },
}) => {
  const renderProgramIcon = (programName: string) => {
    switch (programName) {
      case EProgramShortNames.GV:
        return <GvIcon />;
      case EProgramShortNames.GTa:
        return <GtaIcon />;
      case EProgramShortNames.GT:
        return <GtaIcon />;
      case EProgramShortNames.GE:
        return <GtaIcon />;
      case EProgramShortNames.GTe:
        return <GteIcon />;
    }
  };

  const renderDuration = () => {
    if (!duration) return EDurationNames.short;

    switch (duration.duration_type) {
      case EDurationType.short:
        return EDurationNames.short;
      case EDurationType.medium:
        return EDurationNames.medium;
      case EDurationType.long:
        return EDurationNames.long;
      default:
        return EDurationNames.short;
    }
  };

  return (
    <div className="Opportunities__item">
      <div className="row">
        <div className="col-3">
          <div className="Opportunities__item-img">
            <span className="Opportunities__item-icon">{renderProgramIcon(programme.short_name_display)}</span>
            <img style={{ width: '100%' }} src={image_url} alt={title} />
          </div>
        </div>
        <div className="col-9">
          <h1 className="Opportunities__item-title">{title}</h1>
          <p className="Opportunities__item-info">
            <span className="Opportunities__item-info-location">
              {location ? location : 'Unkown location'} | {renderDuration()}
            </span>
            <span className="Opportunities__item-info-duration" />
          </p>
          <p className="Opportunities__item-desc">{description}</p>
          <div className="Opportunities__item-company">
            {branch ? <img className="Opportunities__item-company-img" src={branch.company.profile_photo} alt={branch.company.name} /> : ''}
            <span className="Opportunities__item-company-name">{branch ? branch.company.name : 'Unknown Company'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
