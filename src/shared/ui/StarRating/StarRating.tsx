import React, { memo, useState } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import StarIcon from '../../assets/icons/rating.svg';
import { Icon } from '../Icon';
import cls from './StarRating.module.scss';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
    isEditable?: boolean;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        size = 28,
        onSelect,
        isEditable = false,
        selectedStars = 0,
    } = props;

    const [currentStarsCount, setCurrentStartsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected && isEditable) {
            setCurrentStartsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected && isEditable) {
            setCurrentStartsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected && isEditable) {
            onSelect?.(starsCount);
            setCurrentStartsCount(starsCount);
            setIsSelected(true);
        }
    };

    // const handleSpace =
    //     (starsCount: number) => (event: React.KeyboardEvent) => {
    //         if (event.code === 'Space' && !isSelected && isEditable) {
    //             onSelect?.(starsCount);
    //             setCurrentStartsCount(starsCount);
    //             setIsSelected(true);
    //         } else {
    //             return;
    //         }
    //     };

    return (
        <div className={classNames(cls['star-rating'], {}, [className])}>
            {stars.map((star) => {
                const commonProps = {
                    className: classNames(
                        cls['star-icon'],
                        { [cls['is-selected']]: isSelected },
                        [currentStarsCount >= star ? cls.hovered : cls.normal],
                    ),
                    Svg: StarIcon,
                    key: star,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(star),
                    onClick: onClick(star),
                    // onKeyDown: ((event: React.KeyboardEvent)=> ),
                    tabIndex: isEditable ? 0 : -1,
                    'data-selected': currentStarsCount >= star,
                };

                return (
                    <Icon
                        clickable={!isSelected && isEditable}
                        {...commonProps}
                    />
                );
            })}
        </div>
    );
});
