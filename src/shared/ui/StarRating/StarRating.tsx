import {
    useEffect,
    useState,
    KeyboardEvent,
    forwardRef,
    ForwardedRef,
    useRef,
    HTMLAttributes,
} from 'react';
import { classNames } from '../../lib/classNames/classNames';
import StarIcon from '../../assets/icons/rating.svg';
import { Icon } from '../Icon';
import { FieldError } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import cls from './StarRating.module.scss';

interface StarRatingProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    setRating?: (selectedStars: number) => void;
    selectedStars: number;
    isEditable?: boolean;
    error?: FieldError;
}

export const StarRating = forwardRef(
    (props: StarRatingProps, ref: ForwardedRef<HTMLDivElement>) => {
        const {
            className,
            setRating,
            isEditable = false,
            selectedStars,
            error,
            tabIndex,
            ...otherProps
        } = props;

        const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
            new Array(5).fill(<></>),
        );
        const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

        useEffect(() => {
            constructRating(selectedStars);
        }, [selectedStars, tabIndex]);

        const computeFocus = (rating: number, index: number): number => {
            if (!isEditable) {
                return -1;
            }
            if (!selectedStars && index === 0) {
                return tabIndex ?? 0;
            }
            if (rating === index + 1) {
                return tabIndex ?? 0;
            }
            return -1;
        };

        const changeDispay = (starsCount: number) => {
            if (!isEditable) {
                return;
            }
            constructRating(starsCount);
        };

        const onClick = (starsCount: number) => {
            if (!isEditable || !setRating) {
                return;
            }
            setRating?.(starsCount);
        };

        const handleKey = (e: KeyboardEvent) => {
            if (!isEditable || !setRating) {
                return;
            }
            if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
                if (!selectedStars) {
                    setRating(1);
                } else {
                    e.preventDefault();
                    setRating(selectedStars < 5 ? selectedStars + 1 : 5);
                }
                ratingArrayRef.current[selectedStars]?.focus();
            }
            if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
                e.preventDefault();
                setRating(selectedStars > 1 ? selectedStars - 1 : 1);
                ratingArrayRef.current[selectedStars - 2]?.focus();
            }
        };

        const constructRating = (starsCount: number) => {
            const updatedArray = ratingArray.map(
                (element: JSX.Element, index: number) => {
                    return (
                        <span
                            className={classNames(cls.star, {
                                [cls.filled]: index < starsCount,
                                [cls.editable]: isEditable,
                            })}
                            role={isEditable ? 'slider' : ''}
                            aria-label={
                                isEditable
                                    ? 'Укажите рейтинг'
                                    : 'рейтинг' + selectedStars
                            }
                            aria-invalid={!!error}
                            aria-valuenow={selectedStars}
                            aria-valuemax={5}
                            aria-valuemin={1}
                            tabIndex={computeFocus(selectedStars, index)}
                            onMouseEnter={() => changeDispay(index + 1)}
                            onMouseLeave={() => changeDispay(selectedStars)}
                            onClick={() => onClick(index + 1)}
                            onKeyDown={handleKey}
                            ref={(r) => ratingArrayRef.current?.push(r)}
                        >
                            <Icon
                                Svg={StarIcon}
                                width={'28px'}
                                height={'28px'}
                            />
                        </span>
                    );
                },
            );
            setRatingArray(updatedArray);
        };

        return (
            <div
                className={classNames(
                    cls['star-rating'],
                    { [cls.error]: error?.message },
                    [className],
                )}
                ref={ref}
                {...otherProps}
            >
                {ratingArray.map((rating, index) => (
                    <span key={index}>{rating}</span>
                ))}
                {/* {ratingArray} */}
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </div>
        );
    },
);
